import Media from '../models/Media.js';
import Wedding from '../models/Wedding.js';
import cloudinary, { isCloudinaryConfigured } from '../config/cloudinary.js';
import fs from 'fs';

// @desc    Upload media file (photo, video, audio)
// @route   POST /api/media/upload
// @access  Private
export const uploadMediaFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select a file to upload' });
    }

    const { weddingId, category, mediaType, title, isHero, isGallery } = req.body;
    let url = '';
    let publicId = '';

    if (isCloudinaryConfigured()) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          resource_type: 'auto',
          folder: `weddings/${weddingId || 'general'}`,
        });
        url = uploadResult.secure_url;
        publicId = uploadResult.public_id;
        // Clean up local temp file
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (cloudErr) {
        console.warn('Cloudinary upload failed, falling back to local URL:', cloudErr.message);
        url = `/uploads/${req.file.filename}`;
      }
    } else {
      // Local fallback
      url = `/uploads/${req.file.filename}`;
    }

    let mediaDoc = null;
    if (weddingId) {
      mediaDoc = await Media.create({
        weddingId,
        url,
        publicId,
        mediaType: mediaType || (req.file.mimetype.startsWith('video') ? 'video' : req.file.mimetype.startsWith('audio') ? 'audio' : 'image'),
        category: category || 'couple',
        title: title || req.file.originalname,
        isHero: isHero === 'true' || isHero === true,
        isGallery: isGallery !== undefined ? isGallery === 'true' || isGallery === true : true,
      });
    }

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url,
        publicId,
        media: mediaDoc,
      },
    });
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get media items for a wedding
// @route   GET /api/wedding/:weddingId/media
// @access  Public
export const getMediaByWedding = async (req, res) => {
  try {
    const { category, type } = req.query;
    const filter = { weddingId: req.params.weddingId };
    if (category) filter.category = category;
    if (type) filter.mediaType = type;

    const media = await Media.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: media.length, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete media item
// @route   DELETE /api/media/:id
// @access  Private
export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found' });
    }

    const wedding = await Wedding.findOne({ _id: media.weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (media.publicId && isCloudinaryConfigured()) {
      try {
        await cloudinary.uploader.destroy(media.publicId, { resource_type: media.mediaType === 'video' ? 'video' : 'image' });
      } catch (err) {
        console.warn('Failed to delete from Cloudinary:', err.message);
      }
    }

    await Media.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

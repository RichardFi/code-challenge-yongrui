import {
  getAllSites,
  getSiteById,
  addSite,
  updateSiteById,
  getSiteHistoryById
} from '../controllers/site'
import express from 'express'

const router = express.Router()

router.get('/', getAllSites)
router.get('/:id', getSiteById)
router.post('', addSite)
router.put('/:id', updateSiteById)
router.get('/:id/history', getSiteHistoryById)

export default router

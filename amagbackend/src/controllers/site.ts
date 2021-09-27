import { Request, Response } from 'express'
import Site from '../models/site'

const getAllSites = async (req: Request, res: Response): Promise<Response> => {
  const sites = await Site.find().exec()
  return res.json({ sites })
}

const addSite = async (req: Request, res: Response) => {
  const { name, region, description, latitude, longitude } = req.body
  try {
    const site = new Site({
      name,
      region,
      description,
      latitude,
      longitude
    })
    await site.save()
    return res.status(201).json(site)
  } catch (e) {
    return res.sendStatus(400)
  }
}

const getSiteById = async (req: Request, res: Response) => {
  const { id } = req.params
  const site = await Site.findById(id).exec()
  if (!site) {
    return res.sendStatus(404)
  }
  return res.json(site)
}

const updateSiteById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, region, description, latitude, longitude } = req.body
  const site = await Site.findById(id).exec()
  if (!site) {
    return res.sendStatus(404)
  }
  if (!(name && region && description && latitude && longitude)) {
    return res.sendStatus(400)
  }
  console.log('passed')
  try {
    site.history.addToSet({
      name: site.name,
      region: site.region,
      description: site.description,
      latitude: site.latitude,
      longitude: site.longitude,
      update: site.update
    })
    await site.save()

    const newSite = await Site.findByIdAndUpdate(
      id,
      { name, region, description, latitude, longitude, update: new Date() },
      { new: true }
    ).exec()

    return res.json(newSite)
  } catch (e) {
    return res.sendStatus(400)
  }
}

const getSiteHistoryById = async (req: Request, res: Response) => {
  const { id } = req.params
  const site = await Site.findById(id).exec()
  const { history } = site
  return res.json(history)
}
export { getAllSites, getSiteById, addSite, updateSiteById, getSiteHistoryById }

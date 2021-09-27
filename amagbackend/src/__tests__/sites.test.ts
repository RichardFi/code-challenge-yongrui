import supertest from 'supertest'
import mongoose from 'mongoose'
import Site from '../models/site'
import app from '../app'

const request = supertest(app)

const body = {
  name: 'Figtree Avenue',
  region: 'Southeast Queensland, Australia',
  description: 'High accident counts',
  latitude: -27.5599959,
  longitude: 153.0812923
}

const updatedBody = {
  name: 'Grant Terrace',
  region: 'NSW, Australia',
  description: 'High number of speeding complaints',
  latitude: -30.1241232,
  longitude: 151.1233151
}

let siteId

beforeAll(async() => {
  await mongoose.connect(global.__MONGO_URI__)
})

afterAll(async() =>{
  await mongoose.connection.close()
})
describe('/api/sites', () => {
  describe('Create', () => {
    it('should save the site if request is valid', async () => {
      const res = await request.post('/api/sites').send(body)
      expect(res.statusCode).toBe(201)
      const site = await Site.findOne({ name: 'Figtree Avenue' }).exec()
      // save id for following tests
      siteId = site._id
      expect(site.region).toBe(body.region)
      expect(site.description).toBe(body.description)
      expect(site.latitude).toBe(body.latitude)
      expect(site.longitude).toBe(body.longitude)
    })
  })
  describe('Update', () => {
    it('should update the site and update history if request is valid', async () => {
      const res = await request.put(`/api/sites/${siteId}`).send(updatedBody)
      expect(res.statusCode).toBe(200)
      const site = await Site.findOne({ name: 'Grant Terrace' }).exec()
      expect(site.region).toBe(updatedBody.region)
      expect(site.description).toBe(updatedBody.description)
      expect(site.latitude).toBe(updatedBody.latitude)
      expect(site.longitude).toBe(updatedBody.longitude)
    })
  })
  describe('Read', () => {
    it('should find all sites', async () => {
      const res = await request.get('/api/sites')
      expect(res.statusCode).toBe(200)
      const sites = await Site.find().exec()
      expect(sites[0].region).toBe(updatedBody.region)
      expect(sites[0].description).toBe(updatedBody.description)
      expect(sites[0].latitude).toBe(updatedBody.latitude)
      expect(sites[0].longitude).toBe(updatedBody.longitude)
    })
    it('should find a site by id', async () => {
      const res = await request.get(`/api/sites/${siteId}`)
      expect(res.statusCode).toBe(200)
      const site = await Site.findById(siteId).exec()
      expect(site.region).toBe(updatedBody.region)
      expect(site.description).toBe(updatedBody.description)
      expect(site.latitude).toBe(updatedBody.latitude)
      expect(site.longitude).toBe(updatedBody.longitude)
    })
    it('should find a site update history by id', async () => {
      const res = await request.get(`/api/sites/${siteId}/history`)
      expect(res.statusCode).toBe(200)
      const site = await Site.findById(siteId).exec()
      expect(site.history[0].region).toBe(body.region)
      expect(site.history[0].description).toBe(body.description)
      expect(site.history[0].latitude).toBe(body.latitude)
      expect(site.history[0].longitude).toBe(body.longitude)
    })
  })
})

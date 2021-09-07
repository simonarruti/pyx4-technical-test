import MongoDBProvider from "../database/providers/MongoDBProvider"
import MongoDBThoughtRepository from "../database/repositories/MongoDBThoughtRepository"
import ThoughtModel from "../database/models/ThoughtModel"

beforeAll(async () => {
	await MongoDBProvider.init()
		.catch(() => {
			console.log('MongoDB must be started to run the test.')
		})
})

afterAll( async () => {
	await MongoDBProvider.close()
})

test('Test if new created thought is in database', async () => {
	const repository = new MongoDBThoughtRepository(MongoDBProvider)

	const thought : ThoughtModel = {
		abstract: 'abtract text',
		content: 'content text',
		lastModified: new Date()
	}

	const newThought = await repository.create(thought)
	const newThoughtId = newThought.insertedId.toHexString()
	
	const findThought = await repository.find(newThoughtId)
	const findThoughtId = findThought[0].id.toHexString()

	expect(newThoughtId).toEqual(findThoughtId)
})
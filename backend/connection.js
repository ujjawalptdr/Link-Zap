import { connect } from 'mongoose'

export async function connectMongoDb(url) {
    return connect(url)
}

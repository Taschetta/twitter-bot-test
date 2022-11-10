import { TwitterApi } from "twitter-api-v2";

const API_KEY = process.env.API_KEY
const API_KEY_SECRET = process.env.API_KEY_SECRET
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const USER_ID = process.env.USER_ID
const HASHTAG = `#${process.env.HASHTAG}`
const INTERVAL_MS = parseInt(process.env.INTERVAL_MS)

const twitter = (new TwitterApi({
  appKey: API_KEY,
  appSecret: API_KEY_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_TOKEN_SECRET,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})).readWrite


setInterval(async () => {
  console.log('starting run')
  
  const start_time = new Date(Date.now() - INTERVAL_MS).toISOString()
  const tweets = await twitter.v2.search(HASHTAG, { start_time })

  console.log('tweets', tweets)
 
  for (const tweet of tweets) {
    console.log('tweet', tweet)
    twitter.v2.retweet(USER_ID, tweet.data.id)
  }

  console.log('ending run')
}, INTERVAL_MS);
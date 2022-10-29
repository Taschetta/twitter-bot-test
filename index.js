import { ETwitterStreamEvent, TwitterApi } from "twitter-api-v2";

const API_KEY = process.env.API_KEY
const API_KEY_SECRET = process.env.API_KEY_SECRET
const BEARER_TOKEN = process.env.BEARER_TOKEN
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const USER_ID = process.env.USER_ID

const twitter_write = (new TwitterApi({
  appKey: API_KEY,
  appSecret: API_KEY_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_TOKEN_SECRET,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})).readWrite

const twitter_read = (new TwitterApi(BEARER_TOKEN)).readWrite

// console.log(await twitter.v2.updateStreamRules({ delete: { ids: [STREAM_RULE_ID] } }))
// console.log(await twitter.v2.updateStreamRules({ add: [{ value: '#pruebadebotdetwitter' }] }))

const stream = await twitter_read.v2.searchStream({ autoConnect: true })

stream.on(ETwitterStreamEvent.Connected, () => console.log('Stream is started.'));

stream.on(ETwitterStreamEvent.Data, (tweet) => {
  console.log(tweet)
  twitter_write.v2.retweet(USER_ID, tweet.data.id)
    .then(console.log)
    .catch(console.log)
});

stream.on(ETwitterStreamEvent.ConnectionError, console.log)


try {
  await stream.connect()  
} catch (error) {
  await stream.close()
}

// await stream.connect()

// const response = await twitter.v2.searchStream({ })
// const tweets = response.data.data

// for await (const tweet of tweets) {
  // const retweeet_response = await twitter.v2.retweet(USER_ID, tweet.id)
  // console.log(retweeet_response)
// }
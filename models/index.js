var mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient

mongoose.connect("mongodb://root:router1@ds223763.mlab.com:23763/getdev", (err)=>{
    if(err) throw err
})

mongoose.set('debug', true)

module.exports.User = require('./user')
module.exports.BucketList = require('./bucketlist')
module.exports.Item = require('./items')

// https://localhost/_iv/?token=AK2wQ-xyHHm_va4yQjjQubB7ayXaHfvKcao4deZD8zRRPJ-hcQFDbFxevcY_-ZOIMaCiehIz4v9XcoTGMcnEJaK1N06_W9In0vT7wgSIfTh4zfbjAANklvqJykLlU6uv4SPbPDr4TBuLULH6-CWWlRH7SrJkFq6cjJginHd4Ohzicle7szOubPTntZRJ6xq0LMikSsrV0KLZEJ9x5FCKkHCU6KcdOSbZT5QWtk_7_bVZRuvkhmv9n8k01APjyNeWtQ8AiGlWbf8ja5buPxfiXXzw4q3Z_mf1mFEzo2R3866K4tJ5PZEcICYDVoQZaKC-9z-a198IQ4DBhpS8iEpHhHFAI3PMpeiZYU4fZ0x3e8PZ2dao3uQTBUve0TszwIpWgFbflzAXNNis{!EXTERNALAUTH!}&guestId=5ab3e120fbda240d5256fb67&weddingId=5ab3dfc8fbda240d5256fb51

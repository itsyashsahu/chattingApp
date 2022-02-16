// const express = require('express')
// const app = express()
// var cors = require('cors');
// const path = require('path')
// const PORT = process.env.PORT || 4000
// app.use(express.json())
// // app.use(cors());
// // only for httpPOnly Cookies
// // app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// // var cookieParser = require('cookie-parser')
// // app.use(cookieParser())

// // require('./db/connfig');

// // app.use( "/api/checklogin"  , require( './routes/checkLogin') )
// // app.use( "/api/users"   , require( './routes/users') )
// // app.use( "/api/report"   , require( './routes/report') )
// // app.use( "/api/holding"   , require( './routes/holding') )
// // app.use( "/api/watchlist"   , require( './routes/watchlist') )
// app.use( "/api/transhistory"   , (req,res,next)=>{
//     console.log("hellow world");
// } )


// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

// app.listen(PORT,()=>{
//     console.log("server is running on",PORT)
// })
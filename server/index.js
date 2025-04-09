const express=require("express")
const routes=require("./routes/route")
const databasae=require("./connetion")
const app=express()

app.use(express.json())
const PORT=process.env.PORT || 8000;

app.use(routes)
app.listen(PORT,()=>{
    console.log(`Sever start at Port ${PORT}`)
})
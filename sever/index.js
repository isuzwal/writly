const express=require("express")
const routes=require("./routes/route")
const app=express()

const PORT=process.env.PORT || 8000;

app.use(routes)
app.listen(PORT,()=>{
    console.log(`Sever start at Port ${PORT}`)
})
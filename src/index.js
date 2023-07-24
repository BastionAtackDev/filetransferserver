const express = require('express')
const fs = require('fs')
const path = require("path")
let files = fs.readdirSync('./')
let webpage = ``
const options = {
    root: "./"
}
function generateLinks(text){
    let links = ''
    // console.log(Object.keys(text).length)
    for (let i = 0; i < Object.keys(text).length; i++) {
        // console.log(i);
        if (text[i].indexOf('.') > 0){
            links = links + `<a href='/${text[i]}' download='${text[i]}'>${text[i]}</a><br>`
        } else {
            links = links + `<a href='/${text[i]}'>${text[i]}</a><br>`
        }
    }
    return links
}
 
// function generateLinks(text){
//     let links = ''
//     // console.log(Object.keys(text).length)
//     for (let i = 0; i < Object.keys(text).length; i++) {
//         // console.log(i);
//         links = links + `<a href='/${text[i]}'>${text[i]}</a><br>`
//     }
//     return links
// }
function renderPage(paths){
    files = fs.readdirSync(paths)
        webpage = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FileTranserServer</title>
        </head>
        <body>
            <ul>
                ${generateLinks(files)}
            </ul>
            </body>
            </html>`
        return webpage
}
// function renderFolderPage(paths){
//     files = fs.readdirSync(paths)
//         webpage = `<!DOCTYPE html>
//         <html lang="en">
//         <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>FileTranserServer</title>
//         </head>
//         <body>
//             <ul>
//                 ${generateFolderLinks(files)}
//             </ul>
//             </body>
//             </html>`
//         return webpage
// }
// function renderPage2(){
//     files = fs.readdirSync('./')
//     webpage = `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>FileTranserServer</title>
//     </head>
//     <body>
//         ${folderFiles}
//     </body>
//     </html>`
//     return webpage
// }

// let index = ""
// console.log(files)
const app = express()
const port = 3000

app.get('/', (req,res) =>{
    console.log("Main Page loaded")
    res.send(renderPage("./"))
})


app.get('/:fileId', (req,res) =>{
    fs.readFile(`./${req.params.fileId}`, 'utf8', (err, data) => {
        if (err) {
            // #TODO
            // folderFiles = fs.readdirSync(`.//${req.params.fileId}`)
            // console.log(folderFiles)
            // res.send(renderPage("folderFiles"))
            res.send(renderPage(`./${req.params.fileId}`))
            console.log(`./${req.params.fileId}`)
            return;
        }
        // res.send(renderPage(data))
        // console.log(data)
        res.send(data)
        res.sendFile(req.params.fileId,options,function (err){
            if(err){
                console.log(err)
            }else{
                console.log(`${req.params.fileId} has been downloaded`)
                // console.log(req.params.fileId)
            }
        })

        // console.log(data)
    })
})

app.get('/test/:tagId', (req,res) =>{
    res.send(req.params.tagId)
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
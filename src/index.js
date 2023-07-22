const express = require('express')
const fs = require('fs')
let files = fs.readdirSync('/home/sebastian/Fisiere')
let webpage = ``

function generateLinks(text){
    let links = ''
    console.log(Object.keys(text).length)
    for (let i = 0; i < Object.keys(text).length; i++) {
        console.log(i);
        links = links + `<a href='/download/${text[i]}' download>${text[i]}</a>`
    }
    return links
}
    
function renderPage(){
    files = fs.readdirSync('/home/sebastian/Fisiere')
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
// function renderPage2(){
//     files = fs.readdirSync('/home/sebastian/Fisiere')
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
console.log(files)
const app = express()
const port = 3000

app.get('/', (req,res) =>{
    res.send(renderPage())
})
app.get('/download/:fileId', (req,res) =>{
    fs.readFile(`/home/sebastian/Fisiere/${req.param("fileId")}`, 'utf8', (err, data) => {
        if (err) {
            // #TODO
            // folderFiles = fs.readdirSync(`/home/sebastian/Fisiere/${req.param("fileId")}`)
            // console.log(folderFiles)
            // res.send(renderPage("folderFiles"))
            
            console.log(err)
            return;
        }
        // res.send(renderPage(data))
        // res.send(data)

        // console.log(data)
    })
})

app.get('/test/:tagId', (req,res) =>{
    res.send(req.param("tagId"))
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
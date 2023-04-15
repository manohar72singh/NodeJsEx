//console.log("Starting");
const http= require('http');
const express= require('express');
const app = express();
app.use(express.json());
const server = http.createServer(app);


app.get('/',(req,res)=>{
    //console.log("server is get Now");
    //res.end("here is i'm ending");
    res.status(200);
    res.json({
        message:"Manohar Singh",
        dob:"06/09/2000",
        doY:2000,
        isSuccess: true
    })
});

app.get('/movie',(req,res)=>{
    res.status(200);
    res.json(
        {
            "Instructions": "delete everything in this object and make your own JSON object using different data.",
            "Title": "The Graduate",
            "Year": "1967",
            "Rated": "Approved",
            "Released": "22 Dec 1967",
            "Runtime": "106 min",
            "Genre": [
              "Comedy",
              "Drama",
              "Romance"
            ],
            "Director": "Mike Nichols",
            "Writers": [
              "Calder Willingham (screenplay)",
              "Buck Henry (screenplay)",
              "Charles Webb (based on the novel by)"
            ],
            "Actors": [
              "Anne Bancroft",
              "Dustin Hoffman",
              "Katharine Ross",
              "William Daniels"
            ],
            "Plot": "Ben has recently graduated college, with his parents now expecting great things from him. At his \"Homecoming\" party, Mrs. Robinson, the wife of his father's business partner, has Ben drive her home, which leads to an affair between the two. The affair eventually ends, but comes back to haunt him when he finds himself falling for Elaine, Mrs. Robinson's daughter.",
            "Language": "English",
            "Country": "USA",
            "Awards": "Won 1 Oscar. Another 22 wins & 13 nominations.",
            "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ0ODc4MDk4Nl5BMl5BanBnXkFtZTcwMTEzNzgzNA@@._V1_SX300.jpg",
            "imdbRating": "8.1",
            "imdbVotes": "183,131",
            "imdbID": "tt0061722"
        }
    )
});

app.post('/signUp',(req,res)=>{
    const body = req.body;
    console.log("I have got Data:-",body);
    console.log("You have been signed up")
    //res.status(200);
    res.json({
        message:"Signup successful"
    })
})

app.put('/update-user',(req,res)=>{
    const body = req.body;
    console.log("I have got Data:-",body)
    res.json({
        message:"Update user successful"
    })
})

app.delete('/delete-user',(req,res)=>{
    const body = req.body;
    console.log("delete user :-",body)
    res.json({
        message:"Delete user successful"
    })
})

server.listen(2610,'127.0.0.1',()=>{
    console.log("express server is live now");
});

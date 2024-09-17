const handleApiCall = (req,res) => {
    const PAT = 'a1e24dc6f27d45af91b64b80bbc7a0dd';
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    // image url
    const IMAGE_URL = req.body.input;
    
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
              // "base64": IMAGE_BYTES_STRING
            }
          }
        }
      ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    
    fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", requestOptions)
      .then(response => response.json())
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
}

// all the code above i brought it from app.js file in the frotend section 

const handleImage = (req, res,db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
    // let found = false;
    // database.users.forEach(user => {
    //     if(user.id === id){
    //         found = true;
    //         user.entries++ 
    //         return res.json(user.entries);                      // from backend
    //     }
    // })
    // if(!found) {
    //     res.status(400).json('not found');
    // }
}
module.exports = {
    handleImage,
    handleApiCall

}
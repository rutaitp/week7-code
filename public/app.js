window.addEventListener('load', () => {
  console.log('Window loaded');
  let feed = document.getElementById('feed');

  //fetch all messages from the server
  //1.
  fetch('/messages')
  .then(response => response.json())
  .then(data => {
    // console.log(data);

    //add messages to html
    let messages = data.data;

    for(let i =0; i<messages.length; i++){
      // console.log(messages[i]);
      let message = messages[i].message;
      let time = messages[i].time;

      let newMessage = document.createElement('p');
      let newMessageContent = `${time}: ${message}`;
      newMessage.innerHTML = newMessageContent;
      feed.appendChild(newMessage);
    }

  })
  .catch(err => {
    console.log(err);
  });

  //Submit button
  let msgButton = document.getElementById('msg-submit');
  msgButton.addEventListener('click', ()=> {
    // console.log('Clicked');

    let msgValue = document.getElementById('msg-input').value;
    console.log(msgValue);

    //Create a post request
    let messageObject = {
      message: msgValue
    };

    //stringify
    let messageObjectJSON = JSON.stringify(messageObject);

    fetch('/new-message',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: messageObjectJSON
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      //add new message to the feed
      let message = data.message.message;
      let time = data.message.time;
      let newMessage = document.createElement('p');
      let newMessageContent = `${time}: ${message}`;
      newMessage.innerHTML = newMessageContent;
      // feed.appendChild(newMessage);
      feed.insertBefore(newMessage, feed.firstChild);
    })
    .catch(err => {
      console.log(err);
    });
  });
})

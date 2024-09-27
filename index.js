Survey.ChoicesRestfull.onBeforeSendRequest = function (sender, options) {
  options.request.setRequestHeader(
    "APIkey",
    "xGC687sE1AiWglgqORky95pqEg6IKUx2"
  );
};

const json = {
  title: "Corporate Training Resource Booking System",
  description: "Create a system that allows employees to book resources for various training sessions, manages resource availability, and updates the schedule in real-time using Survey JS, Quickwork, and Google Sheets.",
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "name",
          title: "Name",
          isRequired: true,
        },
        {
          type: "text",
          name: "email",
          title: "Email",
          isRequired: true,
          inputType: "email",
        },
        {
          type: "dropdown",
          name: "bookRoom",
          title: "Book Room",
          isRequired: true,
          choicesByUrl: {
            url: "https://apim.quickwork.co/Quickworkk/all/v1/v1",
            valueName: "Room",
            titleName: "Book Room",
            path: "rooms",
          },
        },
        {
          type: "dropdown",
          name: "roomTime",
          title: "Room TimeSlot",
          choices: [],
        },
        {
          type: "dropdown",
          name: "laptop",
          title: "Laptop",
          isRequired: true,
          choicesByUrl: {
            url: "",
            valueName: "Mentor Name",
            titleName: "Mentors",
            path: "mentors",
          },
        },
        {
          type: "dropdown",
          name: "headphones",
          title: "Headphones",
          isRequired: true,
          choicesByUrl: {
            url: "",
            valueName: "Mentor Name",
            titleName: "Mentors",
            path: "mentors",
          },
        },
      ],
    },
  ],
};

const survey = new Survey.Model(json);
function alertResults(sender) {
  const results = JSON.stringify(sender.data);
}
// https://github.com/abhishekk0103/corporate_survey.git
survey.onValueChanged.add(function (sender, options) {
  var newRoom = sender.getQuestionByName("bookRoom").value;
  var selectedRoomNumber = { "Room Number": newRoom };
//   console.log(JSON.stringify(selectedRoomNumber))

  var slotSettings = {
    "url": "https://apim.quickwork.co/Quickworkk/all/v1/v4",
    "method": "POST",
    "headers": {
      "APIkey": "ZsXhtvGyw1SkIDm5UftIabnppWnF1i14",
      "Content-Type": "application/json",
    },
    "data": JSON.stringify(selectedRoomNumber),
};

  $.ajax(slotSettings).done(function (response) {
    console.log(response);
    sender.getQuestionByName("roomTime").choices = response.newRoomsSlot;
  });
});

survey.onComplete.add(function (sender, options) {
  const data = {
    "Room No.": sender.data.bookRoom,
    "Booked": "Yes",
    "RoomTimeslot": sender.data.roomTime,
    "NameOfClient": sender.data.name,
    "EmailOfClient": sender.data.email,
  };

  alert("The results are: " + JSON.stringify(sender.data));
  $.ajax({
    url: "https://apim.quickwork.co/Quickworkk/all/v1/v2",
    type: "POST",
    contentType: "application/json; charset = utf-8",
    data: JSON.stringify(data),
    headers: { APIkey: "qDdUPMUV4VfhpgVYpOgrcIENfrX62Q1K" },
    success: function (data) {
      alert(data.status);
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  survey.render(document.getElementById("surveyElement"));
});

import { chatService } from "../services/chat.services";

let audiochunks: Blob[] = [];
let mediaRecorder: MediaRecorder;

export function RecordAudio(event: React.MouseEvent<HTMLButtonElement>) {
  let sendAudioBtn = document.getElementById("sendAudioBtn");
  let ownAudio = document.getElementById("ownAudio");
  if (event.currentTarget.textContent === "Record") {
    sendAudioBtn?.classList.add("d-none");
    ownAudio?.classList.add("d-none");
    audiochunks = [];
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorder.start();
    });
    event.currentTarget.textContent = "Stop";
  } else {
    event.currentTarget.textContent = "Record";
    mediaRecorder.stop();
    sendAudioBtn?.classList.remove("d-none");
  }
}

function handleDataAvailable(event: BlobEvent) {
  audiochunks.push(event.data);
  let ownAudio = document.getElementById("ownAudio");
  const audioBlob = new Blob(audiochunks, { type: "audio/wav" });
  let src = URL.createObjectURL(audioBlob);
  ownAudio?.setAttribute("src", src);
  ownAudio?.classList.remove("d-none");
}

export function SendAudio(user: string) {
  const audioBlob = new Blob(audiochunks, { type: "audio/wav" });
  const reader = new FileReader();
  reader.readAsDataURL(audioBlob);
  reader.onload = () => {
    if (reader.result) {
      let audio = reader.result.toString();
      let audioMessage = {
        user: user,
        audio: audio,
      };
      chatService
        .SendAudio(audioMessage)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
}

export function base64ToBlob(str : string) {
    // extract content type and base64 payload from original string
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);

    // decode base64
    var content = atob(b64);

    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(content.length);
    var view = new Uint8Array(buffer);

    // fill the view, using the decoded base64
    for (var n = 0; n < content.length; n++) {
        view[n] = content.charCodeAt(n);
    }

    // convert ArrayBuffer to Blob
    var blob = new Blob([buffer], { type: type });

    return blob;
}

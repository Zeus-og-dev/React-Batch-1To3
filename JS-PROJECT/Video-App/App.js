
let videoPlayer = document.getElementById("videoPlayer");
let videoTitle = document.getElementById("videoTitle");
let videoDescription = document.getElementById("videoDescription");
let videoList = document.getElementById("videoList");
let reviewList = document.querySelector(".review-list");
let reviewForm = document.querySelector(".review-form");
let reviewInput = document.querySelector("#review");

let allVideos = [];
let currentVideo = null;

document.addEventListener("DOMContentLoaded", async function () {
    try {
        let data = await fetch("./Data/data.json");
        allVideos = await data.json();

        // Pick a random video
        currentVideo = allVideos[parseInt(Math.random() * (allVideos.length - 0) + 0)];

        renderVideo(currentVideo);
        renderVideoList(allVideos);
    } catch (err) {
        console.error("Error fetching JSON:", err);
    }
});

function renderVideo(videoData) {
    videoPlayer.src = videoData.video_src;
    videoTitle.innerText = videoData.name;
    videoDescription.innerText = videoData.description;
    renderReviews(videoData.reviews || []);
    videoPlayer.play();
    videoPlayer.setAttribute("loop", true);
}

function renderReviews(reviews) {
    reviewList.innerHTML = "";
    if (reviews.length === 0) {
        reviewList.innerHTML = `<li class="review-item empty">No reviews yet.</li>`;
        return;
    }
    reviews.forEach(review => {
        let li = document.createElement("li");
        li.className = "review-item";
        li.textContent = review;
        reviewList.appendChild(li);
    });
}

function renderVideoList(videos) {
    videoList.innerHTML = "";
    videos.forEach(video => {
        let li = document.createElement("li");
        li.className = "video-item";
        li.dataset.videoSrc = video.video_src;
        li.dataset.reviews = JSON.stringify(video.reviews || []);

        let img = document.createElement("img");
        img.src = video.image_src;
        img.alt = video.name;

        let h3 = document.createElement("h3");
        h3.textContent = video.name;

        let p = document.createElement("p");
        p.textContent = video.description;

        li.append(img, h3, p);
        li.addEventListener("click", () => {
            currentVideo = video;
            renderVideo(video);
        });

        videoList.appendChild(li);
    });
}

reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let review = reviewInput.value.trim();
    if (!review) return;

    addReview(review);
    reviewForm.reset();
});

function addReview(review) {
    if (!currentVideo) return;

    currentVideo.reviews = currentVideo.reviews || [];
    currentVideo.reviews.push(review);
    
    renderReviews(currentVideo.reviews);
}





// let videoPlayer = document.getElementById("videoPlayer");
// let videoTitle = document.getElementById("videoTitle");
// let videoDescription = document.getElementById("videoDescription");
// let videoList = document.getElementById("videoList");
// let reviewList = document.querySelector(".review-list");
// let reviewForm = document.querySelector(".review-form");
// let reviewInput = document.querySelector("#review");
    
// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         let data = await fetch("./Data/data.json");
//         let result = await data.json();

//         // Select a random video to display initially
//         let videoData = result[parseInt(Math.random() * (result.length - 0) + 0)];
//         videoPlayer.setAttribute("src", videoData.video_src);
//         videoTitle.innerText = videoData.name;
//         videoDescription.innerText = videoData.description;
//         for (const review of videoData.reviews) {
//             reviewList.innerHTML += `<li class="review-item">${review}</li>`;
//         }

//         // Render video list
//         for (const videoElement of result) {
//             videoList.innerHTML += `
//             <li class="video-item" data-video-src="${videoElement.video_src}" data-reviews='${JSON.stringify(videoElement.reviews)}' onclick="changeVideo(this)">
//                 <img src="${videoElement.image_src}" alt="${videoElement.name}" />
//                 <h3>${videoElement.name}</h3>
//                 <p>${videoElement.description}</p>
//             </li>`
//         }
//     } catch (err) {
//         console.error("Error fetching JSON:", err);
//     }
// });


// function changeVideo(videoElement) {
//     let newVideoSrc = videoElement.getAttribute("data-video-src");
//     videoPlayer.setAttribute("src", newVideoSrc);
//     videoPlayer.setAttribute("autoplay", "true");
//     videoTitle.innerText = videoElement.querySelector("h3").innerText;
//     videoDescription.innerText = videoElement.querySelector("p").innerText;
//     let reviews = JSON.parse(videoElement.getAttribute("data-reviews"));
//     reviewList.innerHTML = "";
//     for (const review of reviews) {
//         reviewList.innerHTML += `<li class="review-item">${review}</li>`;
//     }
// }

// reviewForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     addReview(reviewInput.value);
// });

// async function addReview(review) {
//     reviewForm.reset();
//     reviewList.innerHTML += `
//     <li class="review-item">
//         ${review}
//     </li>
//     `;
// }


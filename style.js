
 const issueContainer = document.getElementById("issuesContainer")
 const loadingSpinner = document.getElementById("loadingSpinner")
 let issues = []
const issuesDetailsModel = document.getElementById("my_modal_1")
const modalContant = document.getElementById("modalContant")
const modalPriority = document.getElementById("issue-priority")
const modalDescription = document.getElementById("issue-description")
const modalTitle = document.getElementById("issue-title")
const cardCount = document.getElementById("cardCount")



 function showLoading(){
  loadingSpinner.classList.remove("hidden")
  loadingSpinner.classList.add("flex")
issueContainer.innerHTML =""
 }

 function hideLoading(){
loadingSpinner.classList.add("hidden")
 }

async function loadIssues() {

showLoading()
   const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") 
   const data =await response.json()
    issues = data.data
   hideLoading()
   displayIssues (issues)
} 

function displayIssues (issues){
  issueContainer.innerHTML = ""
console.log(issues)
issues.forEach(issue => {
  console.log(issue)
  const card = document.createElement("div") 
  if(issue.status === "open") {
    card.className = "w-[256px] h-[256px] border-t-6 border-green-400 px-3"
  }
  else{
    card.className = "w-[256px] h-[256px] border-t-6 border-purple-400 px-3"
  }
  
  card.innerHTML = `
   <div class="flex justify-between">
          <img src="assets/Open-Status.png" alt="">
          <h2 class="bg-red-400 border-amber-50 rounded-2xl px-3">${issue.priority}</h2>
        </div>
        <div>
          <h2 class="text-2xl font-bold" onclick="openIssueModal('${issue.id}')">${issue.title}</h2>
          <p class="line-clamp-2" onclick="openIssueModal('${issue.id}')">${issue.description}</p>
        </div>
        <div class="flex justify-around">
          <h2 class="text-xl font-bold bg-red-300 rounded-2xl px-3">BUG</h2>
          <h2 class="text-xl font-bold  bg-red-300 rounded-2xl px-3"> Help Wanted</h2>
        </div>
        <div class="px-2 py-2 bg-base-200 my-4">
          <p>#1
by john_doe</p>
<p>1/15/24</p>
        </div>
  `
  issueContainer.appendChild(card)
});
 cardCount.textContent =issueContainer.children.length
}
loadIssues()


 document.getElementById("all-btn").addEventListener("click", function(){
  displayIssues (issues)
 })

 document.getElementById("open-btn").addEventListener("click", function(){
const openBtn = issues.filter(issue => issue.status === "open")
  displayIssues (openBtn)
 })

 document.getElementById("closed-btn").addEventListener("click", function(){
  const closedBtn = issues.filter( issue => issue.status ==="closed")
   displayIssues (closedBtn)
 })




async function openIssueModal (issueId){
  console.log(issueId,"issueId")
const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
const data =await res.json()
const issueDetails = data.data
console.log(issueDetails,"data")
modalDescription.textContent=issueDetails.description
modalTitle.textContent=issueDetails.title
modalPriority.textContent=issueDetails.status
  issuesDetailsModel.showModal()
 }


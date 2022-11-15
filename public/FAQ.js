let key = "${param.key}";

if(key === "first"){
	
	$("#second-tab").removeClass("active");
	$("#third-tab").removeClass("active");
	$("#first-tab").addClass("active");
	
	$("#second").removeClass("show active");
	$("#third").removeClass("show active");
	$("#first").addClass("show active");
	
}else if(key === "second"){
	
	$("#third-tab").removeClass("active");
	$("#first-tab").removeClass("active");
	$("#second-tab").addClass("active");
	
	$("#first").removeClass("show active");
	$("#third").removeClass("show active");
	$("#second").addClass("show active");
	
}else if(key === "third"){
	
	$("#first-tab").removeClass("active");
	$("#second-tab").removeClass("active");
	$("#third-tab").addClass("active");
	
	$("#second").removeClass("show active");
	$("#first").removeClass("show active");
	$("#third").addClass("show active");
}

axios({
    method: 'get',
    url: 'http://localhost:3000/FAQ',
    responseType: 'json'
    })
    .then(function (response) { 
        let FAQLIST = response.data.data;

        for(i = 0; i < FAQLIST.length; i++){
			if(FAQLIST[i].category == 1){
				$("#accordionExample").append(`
					<div class="accordion-item">
						<h2 class="accordion-header" id="heading${FAQLIST[i].category}${FAQLIST[i].num}">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${FAQLIST[i].category}${FAQLIST[i].num}"
								aria-expanded="true" aria-controls="collapse${FAQLIST[i].category}${FAQLIST[i].num}" style="color: #325341; font-weight: bolder;">
								<img src="../imge/letter-q.png" width="30px" height="30px">&nbsp;
								${FAQLIST[i].question}
							</button>
						</h2>
						<div id="collapse${FAQLIST[i].category}${FAQLIST[i].num}" class="accordion-collapse collapse" aria-labelledby="heading${FAQLIST[i].category}${FAQLIST[i].num}"
							data-bs-parent="#accordionExample">
							<div class="accordion-body text-start">
								<img src="../imge/letter-a.png" width="30px" height="30px">&nbsp;
								${FAQLIST[i].answer}
							</div>
						</div>
					</div>
				`) 
			}
			else if(FAQLIST[i].category == 2){
				$("#accordionExample2").append(`
					<div class="accordion-item">
						<h2 class="accordion-header" id="heading${FAQLIST[i].category}${FAQLIST[i].num}">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${FAQLIST[i].category}${FAQLIST[i].num}"
								aria-expanded="true" aria-controls="collapse${FAQLIST[i].category}${FAQLIST[i].num}" style="color: #325341; font-weight: bolder;">
								<img src="../imge/letter-q.png" width="30px" height="30px">&nbsp;
								${FAQLIST[i].question}
							</button>
						</h2>
						<div id="collapse${FAQLIST[i].category}${FAQLIST[i].num}" class="accordion-collapse collapse" aria-labelledby="heading${FAQLIST[i].category}${FAQLIST[i].num}"
							data-bs-parent="#accordionExample${FAQLIST[i].category}">
							<div class="accordion-body text-start">
								<img src="../imge/letter-a.png" width="30px" height="30px">&nbsp;
								${FAQLIST[i].answer}
							</div>
						</div>
					</div>
				`) 
			}
			else{
				$("#accordionExample3").append(`
					<div class="accordion-item">
						<h2 class="accordion-header" id="heading${FAQLIST[i].category}${FAQLIST[i].num}">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${FAQLIST[i].category}${FAQLIST[i].num}"
								aria-expanded="true" aria-controls="collapse${FAQLIST[i].category}${FAQLIST[i].num}" style="color: #325341; font-weight: bolder;">
								<img src="../imge/letter-q.png" width="30px" height="30px">&nbsp;
								${FAQLIST[i].question}
							</button>
						</h2>
						<div id="collapse${FAQLIST[i].category}${FAQLIST[i].num}" class="accordion-collapse collapse" aria-labelledby="heading${FAQLIST[i].category}${FAQLIST[i].num}"
							data-bs-parent="#accordionExample${FAQLIST[i].category}">
							<div class="accordion-body text-start">
								<img src="../imge/letter-a.png" width="30px" height="30px">&nbsp;
								${FAQLIST[i].answer}
							</div>
						</div>
					</div>
				`) 
			}
        
		}                                
    });
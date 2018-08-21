var tree = {
  peoples: [],
  MaxKnee: 0,
  peoplesJSON: '[{"idPers":"1","fio":"Петя Васильевич Пупкин","birthDate":"02.02.1930","deadDate":"02.02.1950","indKnee":"0","indFather":"2","indMother":"3"},{"idPers":"2","fio":"Вася Сидорович Пупкин","birthDate":"02.02.1910","deadDate":"02.02.1960","indKnee":"1","indFather":"4","indMother":"5"},{"idPers":"3","fio":"Маша Ивановна Дубкина","birthDate":"03.03.1910","deadDate":"03.03.1960","indKnee":"1","indFather":"6","indMother":"7"},{"idPers":"4","fio":"Сидор Ильич Пупкин","birthDate":"02.02.1870","deadDate":"02.02.1930","indKnee":"2","indFather":"8","indMother":"9"},{"idPers":"5","fio":"Катя Савишна Жукина","birthDate":"03.03.1880","deadDate":"03.03.1935","indKnee":"2","indFather":"10","indMother":"11"},{"idPers":"6","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"12","indMother":"13"},{"idPers":"7","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"14","indMother":"15"}]',

  init: function() {
    this.peoples = JSON.parse(this.peoplesJSON);
    for (i = 0; i < this.peoples.length; i++) {
      if (this.peoples[i].indKnee > this.MaxKnee) {
        this.MaxKnee = this.peoples[i].indKnee; //Find out max deep
      }
    }
    console.log("Max knee= " + this.MaxKnee);
  },

  out: function(currentId) {
    var person = this.peoples.find(x => x.idPers === String(currentId));
    console.log("нашлось " + person.fio);
    console.log("колено knee_" + person.indKnee);

    var formNew = `<form class="new_pers" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br><label>номер колена<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indKnee}" disabled/></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br></form>`;

    if (!$("div").is("#knee_" + person.indKnee)) {
      console.log("НЕ СУЩ колено knee_" + person.indKnee);
      $("#forms").append(`<div id="knee_${person.indKnee}" class="divKnee">  </div>`);
    }

    $("#knee_" + person.indKnee).append(formNew);

    if (person.indKnee < this.MaxKnee) {
      this.out(person.indFather);
      this.out(person.indMother);
    }
    return;
  },

  updateField: function(currentId, nameInp, value) {
    for (j = 0; j < this.peoples.length; ++j) {
      if (this.peoples[j].idPers == currentId) { // номер нужного объекта по идентификатору
        this.peoples[j][nameInp] = value;
        this.strJSON = JSON.stringify(this.peoples);
        console.log(this.strJSON);
        break;
      }
    }
  }

}

$(function() {

  $(".editable").on('blur', function() {
    tree.updateField(+$(this).closest("form").find("input.inpIdPers").val(), $(this).attr("name"), $(this).val());
  });

});

tree.init();
tree.out(1);

var tree = {
  peoples: [],
  MaxKnee: 0,
  peoplesJSON: '[{"idPers":"1","fio":"Петя Васильевич Пупкин","birthDate":"02.02.1930","deadDate":"02.02.1950","indKnee":"0","indFather":"2","indMother":"3"},{"idPers":"2","fio":"Вася Сидорович Пупкин","birthDate":"02.02.1910","deadDate":"02.02.1960","indKnee":"1","indFather":"4","indMother":"5"},{"idPers":"3","fio":"Маша Ивановна Дубкина","birthDate":"03.03.1910","deadDate":"03.03.1960","indKnee":"1","indFather":"6","indMother":"7"},{"idPers":"4","fio":"Сидор Ильич Пупкин","birthDate":"02.02.1870","deadDate":"02.02.1930","indKnee":"2","indFather":"8","indMother":"9"},{"idPers":"5","fio":"Катя Савишна Жукина","birthDate":"03.03.1880","deadDate":"03.03.1935","indKnee":"2","indFather":"10","indMother":"11"},{"idPers":"6","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"12","indMother":"13"},{"idPers":"7","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"14","indMother":"15"}]',
//  peoplesJSON: '[{"idPers":"1","fio":"Петя Васильевич Пупкин","birthDate":"02.02.1930","deadDate":"02.02.1950","indKnee":"0","indFather":"2","indMother":"3"},{"idPers":"2","fio":"Вася Сидорович Пупкин","birthDate":"02.02.1910","deadDate":"02.02.1960","indKnee":"1","indFather":"4","indMother":"5"},{"idPers":"3","fio":"Маша Ивановна Дубкина","birthDate":"03.03.1910","deadDate":"03.03.1960","indKnee":"1","indFather":"6","indMother":"7"},{"idPers":"4","fio":"Сидор Ильич Пупкин","birthDate":"02.02.1870","deadDate":"02.02.1930","indKnee":"2","indFather":"8","indMother":"9"},{"idPers":"5","fio":"Катя Савишна Жукина","birthDate":"03.03.1880","deadDate":"03.03.1935","indKnee":"2","indFather":"10","indMother":"11"},{"idPers":"6","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"12","indMother":"13"},{"idPers":"7","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"14","indMother":"15"},{"idPers":"8","fio":"Unknown","birthDate":"","deadDate":"","indKnee":"3","indFather":"16","indMother":"17"},{"idPers":"9","fio":"","birthDate":"","deadDate":"","indKnee":"3","indFather":"18","indMother":"19"},{"idPers":"10","fio":"","birthDate":"","deadDate":"","indKnee":"3","indFather":"20","indMother":"21"},{"idPers":"11","fio":"","birthDate":"","deadDate":"","indKnee":"3","indFather":"22","indMother":"23"},{"idPers":"12","fio":"","birthDate":"","deadDate":"","indKnee":"3","indFather":"24","indMother":"25"},{"idPers":"13","fio":"","birthDate":"","deadDate":"","indKnee":"3","indFather":"26","indMother":"27"},{"idPers":"14","fio":"","birthDate":"","deadDate":"","indKnee":"3","indFather":"28","indMother":"29"},{"idPers":"15","fio":"","birthDate":"","deadDate":"","indKnee":"3","indFather":"30","indMother":"31"}]',
  init: function() {
    this.peoples = JSON.parse(this.peoplesJSON);
    for (i = 0; i < this.peoples.length; i++) {
      if (this.peoples[i].indKnee > this.MaxKnee) {
        this.MaxKnee = this.peoples[i].indKnee; //Find out max deep
      }
    }
  },

  out: function(currentId) {//, childId
    var person = this.peoples.find(x => x.idPers === String(currentId));
    var active = this.isActive(currentId) ? "active" : "";
    var addFather = this.isActive(person.indFather) ? "" : `<a href='' class='addParent addFather' data-id="${person.indFather}">Отец</a>`;
    var addMother = this.isActive(person.indMother) ? "" : `<a href='' class='addParent addMother' data-id="${person.indMother}">Мать</a>`;
    var formNew = `<form class="new_pers ${active}" method="post" data-id="${currentId}" data-knee="${person.indKnee}" data-mother_id="${person.indMother}" data-father_id="${person.indFather}"> <input class="editable inpFio" type="text" placeholder="ФИО" name="fio" value="${person.fio}"/><div class="dates"><input class="editable inpBirthDate" type="text" name="birthDate" placeholder="Дата рождения" value="${person.birthDate}"> - <input class="editable inpDaedDate" type="text" name="deadDate" placeholder="Дата смерти" value="${person.deadDate}"></div> <div class="addParents">${addFather}${addMother}</div></form>`;

    if (!$("div").is("#knee_" + person.indKnee)) {
      $("#forms").append(`<div id="knee_${person.indKnee}" class="divKnee">  </div>`);
    }

    $("#knee_" + person.indKnee).append(formNew);

    if (person.indKnee < this.MaxKnee) {
      this.out(person.indFather, currentId);
      this.out(person.indMother, currentId);
    }
    return;
  },

  updateField: function(currentId, nameInp, value) {
    for (j = 0; j < this.peoples.length; ++j) {
      if (this.peoples[j].idPers == currentId) {
        this.peoples[j][nameInp] = value;
        this.strJSON = JSON.stringify(this.peoples);
        console.log(this.strJSON);
        break;
      }
    }
  },
  isActive: function(currentId) {
    var person = this.findPers(currentId);
    if (!person) return false;
    var data = person.fio + person.birthDate + person.deadDate;
    if (data == "") return false;
    return true;
  },
  getCoords: function(id) {
    el = $(`.new_pers[data-id="${id}"]`);
    x = el.position().left;
    y = el.position().top;

    return {
      x: x,
      y: y,
      h: el.outerHeight(),
      w: el.outerWidth()
    };
  },

  drawLines: function(currentId, childId) {
    var person = this.findPers(currentId);
    if (childId && this.isActive(currentId)) {
      lineId = `line${childId}to${currentId}`;
      $('#lines').append(`<svg><line id="${lineId}" stroke="gray"/></svg>`);
      childCoords = this.getCoords(childId);
      thisCoords = this.getCoords(currentId);
      $(`#${lineId}`).attr('x1', childCoords.x + childCoords.w / 2).attr('y1', childCoords.y + childCoords.h).attr('x2', thisCoords.x + thisCoords.w / 2).attr('y2', thisCoords.y);
    }

    if (person.indKnee < this.MaxKnee) {
      this.drawLines(person.indFather, currentId);
      this.drawLines(person.indMother, currentId);
    }
    return;
  },
  createKnee: function(){
    var Nmax = this.peoples.length-1;
    var usedId = this.peoples[Nmax].indMother;//Наибольший существующий Id Fix it
    var j = 1;
    for (i = 0; i < Nmax+1; i++) {
      if (!this.findPers(this.peoples[i].indFather)) {
        var newOb = {};
        newOb.idPers = String(this.peoples[i].indFather);
        newOb.fio = "";
        newOb.birthDate = "";
        newOb.deadDate = "";
        newOb.indKnee = String(this.MaxKnee*1+1);
        newOb.indFather = String(usedId*1 + 2*j-1);
        newOb.indMother = String(usedId*1 + 2*j);
        this.peoples.push(newOb);
        console.log("1. Запушили перса (номер в массиве="+(Nmax+j)+") с id="+this.peoples[Nmax+j].idPers+"  fio="+this.peoples[Nmax+j].fio);
        j=j+1;
      }
      if (!this.findPers(this.peoples[i].indMother)) {
        var newOb = {};
        newOb.idPers = String(this.peoples[i].indMother);
        newOb.fio = "";
        newOb.birthDate = "";
        newOb.deadDate = "";
        newOb.indKnee = String(this.MaxKnee*1+1);
        newOb.indFather = String(usedId*1 + 2*j-1);
        newOb.indMother = String(usedId*1 + 2*j);
        this.peoples.push(newOb);
        console.log("2. Запушили перса (номер в массиве="+(Nmax+j)+") с id="+this.peoples[Nmax+j].idPers+"  fio="+this.peoples[Nmax+j].fio);
        j=j+1;
      }
    }
    this.peoplesJSON = JSON.stringify(this.peoples);
    console.log(this.peoplesJSON);
    Nmax = this.peoples.length-1;
    console.log("3... Последний перс (номер в массиве="+Nmax+") с id="+this.peoples[Nmax].idPers+"  fio="+this.peoples[Nmax].fio);
    $('#forms').empty();
    this.init();
    this.out(1);
  },

  findPers: function(currentId){
    var person = this.peoples.find(x => x.idPers === String(currentId));
    return person;
  }
}

$(function() {

  $(".editable").on('blur', function() {
    tree.updateField(+$(this).closest("form").data("id"), $(this).attr("name"), $(this).val());
  });

  $(window).resize(function() {
    $('#lines').empty();
    tree.drawLines(1);
  });

  $(document).on("click", ".addParent", function(e) {
    e.preventDefault();
    id = $(this).data("id");
    if (!tree.findPers(id)) {
      tree.createKnee();
    }
    $(`.new_pers[data-id="${id}"]`).addClass("active");
    $(`.new_pers[data-id="${id}"]`).children(".editable.inpFio").val("Unknown");
	tree.updateField(+id, "fio", "Unknown");
	//$('#forms').empty();
	//tree.out(1);
    $('#lines').empty();
    tree.drawLines(1);
	
    /***
      to be continued =)



    ***/
  });

});

tree.init();
tree.out(1);
tree.drawLines(1);

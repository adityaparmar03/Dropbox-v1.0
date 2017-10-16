
let dog={
	name:"ADI",
	do:function(){
		console.log(this.name)
	}
}

dog.do();
let newfun = dog.do;
newfun.bind(dog)()
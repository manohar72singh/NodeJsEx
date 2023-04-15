//console.log("Starting");
const fs = require("fs/promises");

// file is written
const myFileWriter = async (fileName, fileContent) => {
	await fs.writeFile(fileName, fileContent);
	console.log("File Is created");

}

const myFileReader = async (fileName) =>{
	const data = await fs.readFile(fileName, "utf8");
	console.log("File is reading --",data);

}

const myFileUpdater = async (fileName, fileContent) =>{
	await fs.appendFile(fileName, fileContent);
	console.log("file is updated");
}

//myFileWriter("info.txt","Jai shri Janesh");
myFileReader("info.txt");
myFileUpdater("info.txt","\n Jai shri Ram");
myFileReader("info.txt");

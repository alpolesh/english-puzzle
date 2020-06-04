

async function getWords(level, round) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${round}&group=${level}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    return data;
}

export default getWords;
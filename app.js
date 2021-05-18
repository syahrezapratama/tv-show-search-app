const searchForm = document.querySelector('#searchForm');
const contents = document.querySelector('#results');
searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    deleteResults();
    const searchInput = searchForm.elements.searchQuery.value;
    const result = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchInput}`)
    console.log(result.data);
    makeResults(result.data);
    searchForm.elements.searchQuery.value = '';
    
})

const makeResults = (shows) => {
    for(let result of shows) {
        //make a div with a class of col
        const col = document.createElement('DIV');
        col.classList.add('col');
        const card = document.createElement('DIV');
        card.classList.add('card');
        card.classList.add('h-100');
        // const resultSection = document.querySelector('#results');
        // resultSection.append(col);
        // col.append(card);
        contents.append(col);
        col.append(card);

        //create image
        if(result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.original;
            img.classList.add('card-img-top');
            card.append(img);
        } 

        //create a card body div
        const cardBody = document.createElement('DIV');
        cardBody.classList.add('card-body');
        card.append(cardBody);

        //display title
        if(result.show.name) {
            const title = document.createElement('H5');
            title.classList.add('card-title');
            title.textContent = result.show.name;
            cardBody.append(title);
        }

        //display genre(s)
        const genreList = document.createElement('P');
        genreList.classList.add('card-text');
        if(result.show.genres) {
            genreList.innerHTML = `${result.show.genres.map(genre => `${genre}`).join(" &middot ")}`; 
        }
        cardBody.append(genreList);
        
    }
}

//deleting the results
function deleteResults() {
    while (contents.firstChild) {
        contents.removeChild(contents.firstChild);
    }
}



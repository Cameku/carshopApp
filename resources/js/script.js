'use strict';

$(document).ready(getAllFunc);

function SearchBtnClicked() {
  let searchValue = $('#search').val();
  if (searchValue) {
    searchCars(searchValue);
  }
}

function subscribeToSearchBtnClick() {
  $('#searchBtn').click(SearchBtnClicked);
}

/////////////////////////////////////////////////
// Functions

//Take all functions
async function getAllFunc() {
  let vehicles = await getAllCars();
  outputHtml(vehicles);
  subscribeToSearchBtnClick();
}

//Filter vehicles
async function searchCars(makeName) {
  let vehicles = await getAllCars();

  let foundCars = vehicles.filter(car => {
    if (makeName === car.makeName) {
      return true;
    }
  });
  outputHtml(foundCars);
}

//Display results
const outputHtml = foundCars => {
  $('.tableRow').remove();

  let rows = '';

  foundCars.forEach(car => {
    rows += `<tr class='tableRow' ><td>${car.makeName}</td><td>${car.Price}</td><td>${car.year}</td><td>${car.color}</td></tr>`;
  });

  $('#carSearched tr:last').after(rows);
};

//Search vehicles in json database
const getAllCars = async function () {
  let response = await fetch('db.json');
  let data = await response.json();
  let vehicles = data.vehicles;

  return vehicles;
};

function getFormData () {
    const priceFrom = document.querySelector("#priceFrom");
    const priceTo = document.querySelector("#priceTo");
    const select = document.querySelector("#select");
    
    data = {
      priceFrom: priceFrom.value,
      priceTo: priceTo.value,
      location: select.value,
    };

    return data
}

function fetchFilteredLocation () {
    data = getFormData();
    url = BASE_URL + '?'
    if (data.priceFrom != "") {
        url += 'price_from=' + data.priceFrom + '&'
    }
    if (data.priceTo != "") {
      url += "price_to=" + data.priceTo + "&";
    }
    if (data.priceFrom != "") {
      url += "city=" + data.location;
    }
    request({
      url: url,
      onSuccess: (data) => {
        renderLocationsList(data);
      },
    });
}
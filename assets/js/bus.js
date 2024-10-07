// function getRejseplan() {
//     fetch('https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1')
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(`${response.status}`)
//             }

//             console.log(response)
//             return response.json
//         })

//         .then((data) => {
//             if (data && isArray(data)) {
//                 console.log(data)
//             }
//             console.log(data)
//         })

//         .catch((error) => {
//             console.log(error)
//         })
// }

function getRejseplan() {
    fetch('https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            console.log(response)
            return response.json();
        })
        .then((data) => {
            const container = document.getElementById('bus');
            container.innerHTML = '';
    
            if (data && Array.isArray(data)) {
                data.forEach(item => {

                    const departureInfo = document.createElement('div');
                    departureInfo.innerHTML = `Departure: ${item.departureTime} - Destination: ${item.destination}`;
                    container.appendChild(departureInfo);

                    console.table(data);
                });
            } else {
                container.textContent = "Ingen buser fundet.";
                console.table(data);
            }
        })
        .catch((error) => {
            console.error(error);

            const container = document.getElementById('bus');
            container.innerHTML = "Error: Kunne ikke fetch data.";
        });
}

getRejseplan();

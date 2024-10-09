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
// function getRejseplan() {
//     fetch('https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1')
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(`${response.status}`);
//             }

//             console.log(response);
//             return response.json();
//         })
//         .then((data) => {
//             let container = document.getElementById('bus');
//             container.innerHTML = '';
    
//             if (data && Array.isArray(data)) {
//                 data.forEach(item => {

//                     const departureInfo = document.createElement('div');
//                     departureInfo.innerHTML = `Departure: ${item.departureTime} - Destination: ${item.destination}`;
//                     container.appendChild(departureInfo);

//                     console.table(data);
//                 });
//             } else {
//                 container.textContent = "Er ikke en Array.";
//                 console.table(data);
//             }
//         })
//         .catch((error) => {
//             console.error(error);

//             let container = document.getElementById('bus');
//             container.innerHTML = "Error: Kunne ikke fetch data.";
//         });
// }

function getBusData() {
    const apiUrl = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fejl i Respons.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the entire response to understand its structure
            const departures = data.MultiDepartureBoard.Departure;

            if (!departures) {
                console.error('No departures found');
                document.getElementById('buses').innerHTML = '<figure><p colspan="4">Ingen Data.</p></figure>';
                return;
            }

            const buses = document.getElementById('buses');
            departures.forEach(departure => {
                const row = document.createElement('figure');
                // Adjust these fields according to the actual response structure
                row.innerHTML = `
                    <p>
                    ${departure.name || 'N/A'}
                    ${departure.type || 'N/A'}
                    ${departure.stop || 'N/A'}
                    ${departure.time || 'N/A'}
                    </p>
                `;
                buses.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error Fetching Data:', error);
            document.getElementById('buses').innerHTML = '<figure><p colspan="4">Error loading data</p></figure>';
        });
}

getBusData();
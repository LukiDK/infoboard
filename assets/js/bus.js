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
            console.log(data);
            const departures = data.MultiDepartureBoard.Departure;
            const nextBus = data.MultiDepartureBoard.Departure[0];

            if (!departures) {
                console.error('Ingen buser fundet.');
                document.getElementById('buses').innerHTML = '<p colspan="4">Ingen Data.</p>';
                return;
            }

            const buses = document.getElementById('buses');
            const limitedDepartures = departures.slice(0, 12);

            limitedDepartures.forEach(departure => {
                const row = document.createElement('div');
                row.classList.toggle('buscard');

                if (departure === nextBus) {
                    row.classList.add('nextbus');
                    row.innerHTML = `<p><b>${departure.name + ' ' + departure.type + ' ' + departure.stop + ' ' + departure.time || 'N/A'}</b></p>`;
                
                } else {
                    row.innerHTML = `
                    <p>
                    ${departure.name || 'N/A'}
                    ${departure.type || 'N/A'}
                    ${departure.stop || 'N/A'}
                    ${departure.time || 'N/A'}
                    </p>
                    `;
                }

                buses.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error Fetching Data:', error);
            document.getElementById('buses').innerHTML = '<p colspan="4">Error loading data</p>';
        });
}

getBusData();
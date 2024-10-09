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
                console.error('Ingen buser fundet.');
                document.getElementById('buses').innerHTML = '<p colspan="4">Ingen Data.</p><';
                return;
            }

            const buses = document.getElementById('buses');
            departures.forEach(departure => {
                const row = document.createElement('div');
                // Adjust these fields according to the actual response structure
                row.classList.toggle('buscard');
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
            document.getElementById('buses').innerHTML = '<p colspan="4">Error loading data</p>';
        });
}

getBusData();
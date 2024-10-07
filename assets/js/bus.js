function getRejseplan() {
    fetch('https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`${response.status}`)
            }

            console.log(response)
            return response.json
        })

        .then((data) => {
            if (data && isArray(data)) {
                console.log(data)
            }
            console.log(data)
        })

        .catch((error) => {
            console.log(error)
        })
}

getRejseplan()


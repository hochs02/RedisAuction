const auctionObject = {
    'id': 1,
    'name': "Ming-Vase",
    'kurzbeschreibung': "schon sehr alt und hier kommt noch ein längerer Text dass es für Lukas schön aussieht",
    'zustand': "gut gebraucht mit 160 000km",
    'herstellungsjahr': "600",
    'bemessung': "30cm * 50cm * 30cm",
    'starthöhe': 20000,
    'intervall': 500,
    'auktionszeit': 'keine Information'
};

const bids = [
    {
        'nutzer': 2,
        'betrag': 35000,
        'timestamp': 40
    },
    {
        'nutzer': 3,
        'betrag': 30000,
        'timestamp': 30
    },
    {
        'nutzer': 2,
        'betrag': 25000,
        'timestamp': 20
    },
    {
        'nutzer': 1,
        'betrag': 20500,
        'timestamp': 10
    }
];

module.exports = {auctionObject, bids};
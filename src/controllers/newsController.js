const axios = require('axios');

const getNews = async (req, res) => {
    try{
        const {preferences} = req.user;
        
        // If no preferences, return empty array
        if(!preferences || preferences.length == 0){
            return res.status(200).json({
                news: []
            });
        }
        // Join preferences with comma for GNews query
        const query = preferences.join(',');

        const response = await axios.get('https://api.gnews.io/v4/top-headlines',{
            params:{
                token: process.env.NEWS_API_KEY,
                topic: query,
                lang: 'en',
                country: 'us'
            }
        });

        const articles = response.data.articles || [];

        res.status(200).json({
            news: articles
        });
    }catch(error){
        // Even if api fails, don't crash - return empty array
        res.status(200).json({
            news: []
        });
    }
};

module.exports = {getNews};

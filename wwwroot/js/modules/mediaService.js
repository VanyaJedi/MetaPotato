import JediMediaService from 'jedi-mediaservice';

const mediaService = new JediMediaService([
    {
        key: 'mobileTablet',
        matchMedia: '(max-width: 1439px)',
    },
    {
        key: 'mobile',
        matchMedia: '(max-width: 767px)',
    },
    {
        key: 'tablet',
        matchMedia: '(min-width: 768px)',
    },
    {
        key: 'desktop',
        matchMedia: '(min-width: 1440px)',
    },
]);

export default mediaService;

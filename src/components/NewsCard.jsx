import { useIsMobile } from '../hooks/useScreenSize';

const NewsCard = () => {
  const isMobile = useIsMobile();

  return (
    <div className="card">
      <div className="card-body">
        <div className={`${isMobile ? 'news-container-mobile' : 'news-container'}`}>
          <h5 className="card-title mb-0">News</h5>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

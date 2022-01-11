import CollectionItem from '../collection-item';
import "./preview-collection.scss";

const PreviewCollection = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title}</h1>
    <div className="preview">
      {items
        .filter((item, index) => index < 4)
        .map(({ id, ...item }) => (
          <CollectionItem key={id} {...item} />
        ))}
    </div>
  </div>
);

export default PreviewCollection;

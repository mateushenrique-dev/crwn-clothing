import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { createSectionsDirectorySelector } from "../../redux/directory/directory.selector";
import MenuItem from "../menu-item";
import "./directory.scss";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem {...otherSectionProps} key={id} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: createSectionsDirectorySelector,
});

export default connect(mapStateToProps)(Directory);

import IndexPage from '../routes/index';
import { withApollo } from 'src/lib/withApollo';

export default withApollo({ ssr: false })(IndexPage);

import styles from './Application.module.css';
import Nav from '../components/application/layout/Nav';
import Steps from '../components/application/layout/Steps';
import StacksLogo from '../public/images/stacks-logo.svg';
import UseOkButton from '../components/application/layout/OkButton';
import Wishlist from '../components/application/Wishlist';
import FundingStream from '../components/application/FundingStream';
import ProjectTrack from '../components/application/ProjectTrack';
import ProjectTags from '../components/application/ProjectTags';
import ProjectInformation from '../components/application/ProjectInformation';
import ProjectRoadmap from '../components/application/ProjectRoadmap';
import MissionStatement from '../components/application/MissionStatement';
import ProjectLinks from '../components/application/ProjectLinks';
import Success from '../components/application/Success';
import ConnectGithub from '../components/application/ConnectGithub';
const Application = () => {
	const { OkButton, currentStep } = UseOkButton();

	const CurrentStep = () => {
		switch (currentStep) {
			case 0:
				return <Wishlist />;
			// return <ConnectGithub />;
			case 1:
				return <FundingStream />;
			case 2:
				return <ProjectTrack />;

			case 3:
				return <ProjectTags />;
			case 4:
				return <ProjectInformation />;

			case 5:
				return <ProjectRoadmap />;

			case 6:
				return <MissionStatement />;

			case 7:
				return <ProjectLinks />;

			case 8:
				return <Success />;
		}
	};

	return (
		<div className={styles.applicationWrapper}>
			<Nav name={'Application'} step={currentStep} />
			<div className={styles.mainComponents}>
				<div className={styles.middleComponent}>
					<Steps
						step={currentStep}
						steps={[
							'Wishlist Project?',
							'Funding Stream & Projet Type',
							'Project Track',
							'Project Tags',
							'Project Information',
							'Project Roadmap',
							'Project Mission Statement',
							'Project Links'
						]}
					/>
				</div>
				<div>
					<CurrentStep />
				</div>
				<div>{OkButton}</div>
			</div>
			<StacksLogo className={styles.stacksSVG} />
		</div>
	);
};

export default Application;

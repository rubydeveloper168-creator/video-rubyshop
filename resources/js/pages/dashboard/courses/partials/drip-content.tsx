import { useI18n } from '@/lib/i18n';

const DripContent = () => {
    const { text } = useI18n();

    return (
        <div>
            <h1>{text('Drip Content')}</h1>
        </div>
    );
};

export default DripContent;

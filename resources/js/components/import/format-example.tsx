import {
    sampleFormatExample,
    type FormatExampleLine,
    type FormatKeyTone,
} from '@/lib/sample/import';

const KEY_TONE_CLASSES: Record<FormatKeyTone, string> = {
    required: 'text-accent',
    optional: 'text-faint',
};

export function FormatExample() {
    return (
        <pre className="overflow-x-auto rounded-md bg-elevated p-4 font-mono text-xs leading-6 text-secondary">
            {sampleFormatExample.map((line, index) => (
                <FormatExampleRow key={index} line={line} />
            ))}
        </pre>
    );
}

function FormatExampleRow({ line }: { line: FormatExampleLine }) {
    return (
        <div>
            {line.indent}
            {line.key && (
                <span className={KEY_TONE_CLASSES[line.keyTone ?? 'optional']}>
                    {`"${line.key}"`}
                </span>
            )}
            {line.text}
        </div>
    );
}

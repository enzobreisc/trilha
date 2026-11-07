import {
    FORMAT_EXAMPLE,
    type FormatExampleLine,
    type FormatKeyTone,
} from '@/components/import/format';

const KEY_TONE_CLASSES: Record<FormatKeyTone, string> = {
    required: 'text-accent',
    optional: 'text-faint',
};

export function FormatExample() {
    return (
        <pre className="overflow-x-auto rounded-sm bg-elevated p-4 font-mono text-xs leading-6 text-secondary inset-ring inset-ring-border">
            {FORMAT_EXAMPLE.map((line, index) => (
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

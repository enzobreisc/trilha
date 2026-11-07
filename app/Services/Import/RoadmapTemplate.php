<?php

namespace App\Services\Import;

class RoadmapTemplate
{
    public const FILE_NAME = 'trilha-modelo.json';

    /**
     * @return array<string, mixed>
     */
    public function document(): array
    {
        return [
            'format' => config('trilha.roadmap_format'),
            'key' => 'meu-primeiro-roadmap',
            'title' => 'Meu primeiro roadmap',
            'sections' => [[
                'key' => 'fundamentos',
                'title' => 'Fundamentos',
                'groups' => [[
                    'key' => 'primeiros-passos',
                    'title' => 'Primeiros passos',
                    'topics' => [
                        [
                            'key' => 'primeiro-topico',
                            'title' => 'Primeiro tópico',
                            'summary' => 'Uma ou duas frases sobre o que o tópico ensina e por que importa.',
                            'checklist' => [
                                'Primeira coisa que você precisa dominar',
                                'Segunda coisa que você precisa dominar',
                            ],
                            'signals' => [
                                'bad' => '// um trecho de código com o problema',
                                'good' => '// o mesmo trecho, corrigido',
                            ],
                            'ai_prompt' => 'Peça para a IA implementar o tópico e descreva o que ela deve entregar.',
                            'review_checks' => ['Uma pergunta para conferir a resposta da IA?'],
                            'exercise' => 'Um exercício para fazer sem consultar nada.',
                            'sources' => [['title' => 'Documentação oficial', 'url' => 'https://example.com/docs']],
                        ],
                        [
                            'key' => 'segundo-topico',
                            'title' => 'Segundo tópico',
                        ],
                    ],
                ]],
            ]],
        ];
    }

    public function contents(): string
    {
        return (string) json_encode($this->document(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}

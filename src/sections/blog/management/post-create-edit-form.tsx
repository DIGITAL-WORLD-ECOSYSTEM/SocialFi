/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Post Create/Edit Form (Admin Management)
 * Version: 1.5.0 - Refactored: State Synchronization & Type Safety
 */

'use client';

import * as z from 'zod';
import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import {
  Form,
  RHFEditor,
  RHFUpload,
  schemaUtils,
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';

import { PostDetailsPreview } from './post-details-preview';
import type { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

/**
 * 🛡️ SCHEMA DE VALIDAÇÃO (ZOD):
 * Define as regras de negócio para a criação de posts.
 * 'schemaUtils' é utilizado para validar inputs complexos como Editor e Upload.
 */
export const PostCreateSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório!' }),
  description: z.string().min(1, { message: 'A descrição curta é obrigatória!' }),
  content: schemaUtils.editor().min(100, { message: 'O conteúdo deve ter pelo menos 100 caracteres.' }),
  coverUrl: schemaUtils.file({ error: 'A imagem de capa é obrigatória!' }),
  tags: z.string().array().min(2, { message: 'Adicione pelo menos 2 tags relevantes.' }),
  metaKeywords: z.string().array().min(1, { message: 'Defina ao menos 1 palavra-chave para SEO.' }),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  publish: z.boolean(),
  comments: z.boolean(),
});

export type PostCreateSchemaType = z.infer<typeof PostCreateSchema>;

type Props = {
  currentPost?: IPostItem;
};

// ----------------------------------------------------------------------

export function PostCreateEditForm({ currentPost }: Props) {
  const router = useRouter();

  const showPreview = useBoolean();
  const openDetails = useBoolean(true);
  const openProperties = useBoolean(true);

  /**
   * ⚙️ VALORES PADRÃO:
   * Memoizamos os valores iniciais para garantir estabilidade na hidratação do formulário.
   */
  const defaultValues = useMemo<PostCreateSchemaType>(() => ({
    title: currentPost?.title || '',
    description: currentPost?.description || '',
    content: currentPost?.content || '',
    coverUrl: currentPost?.coverUrl || null,
    tags: currentPost?.tags || [],
    metaKeywords: currentPost?.metaKeywords || [],
    metaTitle: currentPost?.metaTitle || '',
    metaDescription: currentPost?.metaDescription || '',
    publish: currentPost?.publish || true,
    comments: true,
  }), [currentPost]);

  const methods = useForm<PostCreateSchemaType>({
    mode: 'all',
    resolver: zodResolver(PostCreateSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  /**
   * 🚀 SUBMISSÃO:
   * Integração com SnackBar e roteamento após sucesso.
   */
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
      showPreview.onFalse();
      toast.success(currentPost ? 'Atualizado com sucesso!' : 'Post criado com sucesso!');
      router.push(paths.dashboard.post.root);
      console.info('ASPPIBRA_POST_DATA:', data);
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      toast.error('Ocorreu um erro ao salvar a postagem.');
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  /**
   * 🏗️ RENDERIZAÇÃO DE SEÇÕES:
   * Detalhes Principais (Título, Editor, Upload)
   */
  const renderDetails = () => (
    <Card>
      <CardHeader
        title="Detalhes"
        subheader="Título, descrição curta e corpo do texto..."
        action={
          <IconButton onClick={openDetails.onToggle}>
            <Iconify icon={openDetails.value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'} />
          </IconButton>
        }
      />
      <Collapse in={openDetails.value}>
        <Divider />
        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFTextField name="title" label="Título do Post" placeholder="Ex: Inovação em Paraty" />
          <RHFTextField name="description" label="Descrição" multiline rows={3} />
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Conteúdo</Typography>
            <RHFEditor name="content" sx={{ maxHeight: 480 }} />
          </Stack>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Capa do Post</Typography>
            <RHFUpload name="coverUrl" maxSize={3145728} onDelete={handleRemoveFile} />
          </Stack>
        </Stack>
      </Collapse>
    </Card>
  );

  /**
   * 🏗️ RENDERIZAÇÃO DE SEÇÕES:
   * Propriedades Adicionais e SEO
   */
  const renderProperties = () => (
    <Card>
      <CardHeader
        title="Configurações"
        subheader="SEO, Tags e metadados de governança..."
        action={
          <IconButton onClick={openProperties.onToggle}>
            <Iconify icon={openProperties.value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'} />
          </IconButton>
        }
      />
      <Collapse in={openProperties.value}>
        <Divider />
        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFAutocomplete
            name="tags"
            label="Tags"
            placeholder="+ Tags"
            multiple
            freeSolo
            options={['Agronegócio', 'Web3', 'RWA', 'Paraty'].map((option) => option)}
            getOptionLabel={(option) => option}
          />
          <RHFTextField name="metaTitle" label="SEO: Meta Título" />
          <RHFTextField name="metaDescription" label="SEO: Meta Descrição" multiline rows={3} />
          <RHFAutocomplete
            name="metaKeywords"
            label="SEO: Palavras-chave"
            multiple
            freeSolo
            options={[]}
            getOptionLabel={(option) => option}
          />
          
          <Controller
            name="comments"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label="Habilitar comentários"
                control={<Switch {...field} checked={field.value} />}
              />
            )}
          />
        </Stack>
      </Collapse>
    </Card>
  );

  /**
   * 🏗️ RENDERIZAÇÃO DE SEÇÕES:
   * Botões de Ação e Switch de Publicação
   */
  const renderActions = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
      <Controller
        name="publish"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Publicar Post"
            control={<Switch {...field} checked={field.value} color="success" />}
            sx={{ flexGrow: 1, pl: 3 }}
          />
        )}
      />

      <Button color="inherit" variant="outlined" size="large" onClick={showPreview.onTrue}>
        Pré-visualizar
      </Button>

      <Button
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        disabled={!isValid}
      >
        {!currentPost ? 'Criar Postagem' : 'Salvar Alterações'}
      </Button>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderProperties()}
        {renderActions()}
      </Stack>

      <PostDetailsPreview
        isValid={isValid}
        onSubmit={onSubmit}
        title={values.title}
        open={showPreview.value}
        content={values.content}
        onClose={showPreview.onFalse}
        coverUrl={typeof values.coverUrl === 'string' ? values.coverUrl : ''}
        isSubmitting={isSubmitting}
        description={values.description}
      />
    </Form>
  );
}
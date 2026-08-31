import type { Request, Response } from 'express'
import {
  getNominees,
  updateNomineeTitleById,
} from '../services/nominees.services.js'
import type { Title } from '../db/schema.js'

export const renderNominees = async (_req: Request, res: Response) => {
  const nominees = await getNominees()
  return res.render('pages/nominees', {
    nominees,
    layout: '../views/layouts/public.layout.ejs',
  })
}
export const setNomineeTitle = async (req: Request, res: Response) => {
  const { id, title } = req.query as { id: string; title: Title }
  if (!id || !title) {
    return res.status(400).json({
      success: false,
      message: 'Nominee ID and title are required',
    })
  }
  const updatedNominee = await updateNomineeTitleById(Number(id), title)
  if (!updatedNominee) {
    return res.status(404).json({
      success: false,
      message: 'Nominee not found',
    })
  }
  return res.status(200).json({
    success: true,
    message: 'Title updated successfully',
    data: updatedNominee,
  })
}

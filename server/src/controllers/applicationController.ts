/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/controllers/applicationController.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import { Request, Response } from 'express';
import pool from '../config/db.js';
import { ResultSetHeader } from 'mysql2';

export const submitApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      internship_id,
      applicant_name,
      applicant_email,
      school,
      program,
      student_year,
      coop_term,
      coop_length,
      problem_solving_style,
      areas_of_interest,
      ideal_coop_day,
      curiosity_answer,
      superpower_skill,
      resume_link,
      cover_note
    } = req.body;

    if (!internship_id || !applicant_name || !applicant_email || !resume_link) {
      res.status(400).json({ error: 'Please provide all required fields (internship_id, applicant_name, applicant_email, resume_link)' });
      return;
    }

    const insertQuery = `
      INSERT INTO applications 
      (internship_id, applicant_name, applicant_email, school, program, student_year, coop_term, coop_length, problem_solving_style, areas_of_interest, ideal_coop_day, curiosity_answer, superpower_skill, resume_link, cover_note, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    const interestString = Array.isArray(areas_of_interest) ? areas_of_interest.join(', ') : (areas_of_interest || null);

    const [result] = await pool.query<ResultSetHeader>(insertQuery, [
      internship_id,
      applicant_name.trim(),
      applicant_email.trim(),
      school ? school.trim() : 'University of Saskatchewan',
      program ? program.trim() : null,
      student_year ? student_year.trim() : null,
      coop_term ? coop_term.trim() : null,
      coop_length ? coop_length.trim() : null,
      problem_solving_style ? problem_solving_style.trim() : null,
      interestString,
      ideal_coop_day ? ideal_coop_day.trim() : null,
      curiosity_answer ? curiosity_answer.trim() : null,
      superpower_skill ? superpower_skill.trim() : null,
      resume_link.trim(),
      cover_note ? cover_note.trim() : null
    ]);

    res.status(201).json({
      success: true,
      message: 'Application & Student Assessment submitted successfully!',
      applicationId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

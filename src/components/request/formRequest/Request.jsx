import { Link } from 'react-router-dom';
import styles from'./request.css'


const Header = () =>{
    return (
        <section className={styles.form_question}>
          <Link to="/">UDD LLMM </Link>
          <form action="/process_answer_questions" method="post" enctype="multipart/form-data">
            <p class="form-title"> Введите текст или добавьте файл с Вашего устройства </p>
            <div class="form-text">
              <textarea name="text_for_search_answers" placeholder="Текст для генерации"></textarea>
            </div>
            <div class="form-text_question">
              <textarea name="asked_questions_text" placeholder="Пишите каждый вопрос с новой строки"></textarea>
            </div>
            <div class="input_file_question">
              <div class="input-file">
                <input type="file" name="file" accept=".docx, .doc, .pdf, .txt, .zip"/>
                <label for="file"><span> Выберите файл </span> </label>
              </div>
              <input type="submit" name="send" value="Получить ответ" />
            </div>
          </form>
          <div id="answer_output"></div>
        </section>
    );
}

export default Header;
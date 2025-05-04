import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';

function ReportGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Remplacer par l'appel à l'API de votre outil d'IA (ex. Powerdrill, Storydoc)
      const response = await fetch('https://api.powerdrill.ai/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY', // Remplacer par votre clé API
        },
        body: JSON.stringify({
          prompt: prompt,
          format: 'pdf', // Ou autre format selon l'API
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du rapport');
      }

      const data = await response.json();
      setReport(data.reportUrl); // URL du rapport généré
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-purple-800 mb-4">Générer un Rapport</h1>
      <form onSubmit={handleGenerateReport} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-gray-700 text-sm font-bold mb-2">
            Décrivez le rapport souhaité
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Exemple : Créer un rapport sur les ventes mensuelles avec des graphiques à barres"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {isLoading ? 'Génération en cours...' : 'Générer le Rapport'}
          <FileText size={20} className="inline ml-2" />
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {report && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Rapport Généré</h2>
          <a
            href={report}
            download
            className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Télécharger le Rapport
            <Download size={20} className="ml-2" />
          </a>
        </div>
      )}

      <Link to="/" className="text-fuchsia-500 hover:underline mt-4 inline-block">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default ReportGeneratorPage;